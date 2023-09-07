import {AppConf} from "../conf/AppConf";
import {io, Socket} from "socket.io-client";
import {AppModel} from "../models/AppModel";
import {ICreatedInvoiceParams, IGetProjectsAnswer, IProjectTO} from "../interfaces/projects";
import {ProjectModel} from "../models/ProjectModel";
import {IGetInvoicesAnswer, IInvoiceTO} from "../interfaces/invoices";
import {InvoiceModel} from "../models/InvoiceModel";
import {NotificationService} from "./NotificationService";
import {IWhitelistCheckAddressAnswer} from "../interfaces/address_whitelist";
import {WhitelistModel} from "../models/WhitelistModel";
import {LogService} from "./LogService";

export class BackendService {
    private io: Socket;
    private onConnectActions: (() => void)[] = [];

    constructor(
        private readonly conf: AppConf, 
        private readonly app: AppModel, 
        private readonly notificationService: NotificationService, 
        private readonly log:LogService) {
        this.io = io(conf.backendUrl);
        this.io
            .on("connect", this.onConnect.bind(this))
            .on("disconnect", this.onDisconnect.bind(this))
            .on("getProject.answer", this.onGetProjectAnswer.bind(this))
            .on("getProjects.answer", this.onGetProjectsAnswer.bind(this))
            .on("whitelistCheckAddress.answer", this.onWhitelistCheckAddressAnswer.bind(this))
            .on("getInvoices.answer", this.onGetInvoicesAnswer.bind(this))
            .on("getUserInvoices.answer", this.onGetUserInvoicesAnswer.bind(this))
            .on("createInvoice.answer", this.onCreateInvoiceAnswer.bind(this))

            .on("newInvoiceCreated", this.onNewInvoiceCreated.bind(this))
            .on("invoiceUpdate", this.onInvoiceUpdate.bind(this))
            .on("projectUpdate", this.onProjectUpdate.bind(this))
    }

    ///updates begin
    private onProjectUpdate(data: IProjectTO) {
        this.log.print("onProjectUpdate", data)
        this.app.projects.update([new ProjectModel(data)]);
    }

    private onInvoiceUpdate(data: IInvoiceTO) {
        this.log.print("onInvoiceUpdate", data)
        this.app.invoices.update(data.project_id, [new InvoiceModel(data)]);
    }

    private onNewInvoiceCreated(data: IInvoiceTO) {
        this.log.print("onNewInvoiceCreated", data)
        this.app.invoices.update(data.project_id, [new InvoiceModel(data)]);
    }

    ///updates end

    private onConnect() {
        this.onConnectActions.forEach(it => it());
    }

    private onDisconnect() {

    }
    requestProject(project_id: number) {
        this.log.print("requesting project", project_id)
        this.emit("getProject", project_id);
    }

    private onGetProjectAnswer(data: IProjectTO) {
        this.log.print("onGetProjectAnswer", data)
        this.app.projects.update([new ProjectModel(data)]);
    }

    requestProjects() {
        this.emit("getProjects", {page: 0, limit: 20});
    }

    private onGetProjectsAnswer(data: IGetProjectsAnswer) {
        this.log.print("onGetProjectsAnswer", data)
        this.app.projects.update(data.items.map(it => new ProjectModel(it)), data.total);
    }

    requestCheckWhitelist(project_id: number, receiver_address: string, tier?: number) {
        this.log.print("requesting check whitelist", project_id, receiver_address, tier)
        this.io.emit("whitelistCheckAddress", {project_id, receiver_address, tier: 1})

        // this.emit("whitelistCheckAddress", project_id, receiver)
    }

    private onWhitelistCheckAddressAnswer(data: IWhitelistCheckAddressAnswer) {
        this.log.print("onWhitelistCheckAddressAnswer", data)
        if (data.error) {
            return this.notificationService.showError(data.error);
        }

        this.app.whitelists.update(data.receiver_address, data.project_id, data.items.map(it => new WhitelistModel(it)));
    }

    requestUserInvoices(project_id: number, receiver: string) {
        this.log.print("requesting user invoices", project_id, receiver)
        this.emit("getUserInvoices", {project_id, receiver_address: receiver})
    }

    private onGetUserInvoicesAnswer(data: IGetInvoicesAnswer) {
        this.log.print("onGetUserInvoicesAnswer", data)
        this.app.user_invoices.update(data.project_id, data.items.map(it => new InvoiceModel(it)), data.total);
    }

    createInvoice(p: ICreatedInvoiceParams) {
        this.log.print("requesting create invoice", p)
        this.emit("createInvoice", p)
    }

    private onCreateInvoiceAnswer(data: IInvoiceTO) {
        this.log.print("onCreateInvoiceAnswer", data)
        if (data.error) {
            return this.notificationService.showError(data.error);
        }
        const total = this.app.user_invoices.getTotal(data.project_id);
        this.log.print("total", total, data.project_id)
        this.app.user_invoices.update(data.project_id, [new InvoiceModel(data)],  total + 1);
    }

    requestInvoices(project_id: number) {
        this.log.print("requesting invoices", project_id)
        this.emit("getInvoices", {project_id, page: 0, limit: 20});
    }

    private onGetInvoicesAnswer(data: IGetInvoicesAnswer) {
        this.log.print("onGetInvoicesAnswer", data)
        this.app.invoices.update(data.project_id, data.items.map(it => new InvoiceModel(it)), data.total);
    }

    private emit(event: string, p: any) {
        if (this.io.connected) {
            this.io.emit(event, p)
        } else {
            this.onConnectActions.push(() => this.io.emit(event, p))
        }
    }

    getConf(): AppConf {
        return this.conf;
    }
}