import {AccountModel} from "./AccountModel";
import {BtcDataModel} from "./BtcDataModel";
import {ProjectsTable} from "./ProjectsTable";
import {InvoicesTable} from "./InvoicesTable";
import {WhitelistsTable} from "./WhitelistsTable";

export class AppModel {
    readonly account = new AccountModel();
    readonly btcData = new BtcDataModel();
    readonly projects = new ProjectsTable();
    readonly invoices = new InvoicesTable();
    readonly user_invoices = new InvoicesTable();
    readonly whitelists = new WhitelistsTable();
}