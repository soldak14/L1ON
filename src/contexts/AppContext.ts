import { AppConf } from "../conf/AppConf";
import { AppModel } from "../models/AppModel";
import { BackendService } from "../services/BackendService";
import { NotificationService } from "../services/NotificationService";
import { WalletService } from "../services/WalletService";
import { WorldService } from "../services/WorldService";
import { LocalDataService } from "../services/LocalDataService";
import { LogService } from "../services/LogService";

class AppContext {
  readonly conf = new AppConf();
  readonly model = new AppModel();
  readonly notificationService = new NotificationService();
  readonly log = new LogService();
  readonly backend = new BackendService(
    this.conf,
    this.model,
    this.notificationService,
    this.log
  );
  readonly world = new WorldService(this.conf, this.model);
  readonly localData = new LocalDataService();
  readonly wallet = new WalletService(
    this.model,
    this.world,
    this.backend,
    this.localData
  );
}

export const app = new AppContext();
