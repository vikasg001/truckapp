import {Injectable} from "@angular/core";
import {AppSchema} from "./app.schema";
import {AppLogger} from "./app.log";
import {AppStorage} from "./app.storage";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

/**
 * Created by nsingh on 5/18/2017.
 */
@Injectable()
export class AppSQLite {
  private db: Promise<SQLiteObject>;

  constructor(private sqlite: SQLite) {
    this.db = this.sqlite.create({
      name: 'truckdata.db',
      location: 'default'
    });
    this.createTablesFromSchema();
  }

  getStorage(): Promise<SQLiteObject> {
    return this.db;
  }

  private createTablesFromSchema() {
    if (AppStorage.getItem('tableCreated')) {
      return;
    }
    this.sqlBatch([
      AppSchema.TABLE_USER,
      AppSchema.TABLE_DRIVER,
      AppSchema.TABLE_TRUCK,
      AppSchema.TABLE_FRIEGHT,
      AppSchema.TABLE_FRIGHT_DESCRIPTION,
      AppSchema.TABLE_EXPENSES_DESCRIPTION,
      AppSchema.TABLE_PAYMENT_DESCRIPTION,
      AppSchema.TABLE_PAYMENT_DRIVER
    ]).then(() => {
      AppStorage.setItem('tableCreated', true);
      AppLogger.info("Table created successfully.");
    }, (error) => {
      AppLogger.error("Error when table creation!", error);
    }).catch((error) => {
      AppLogger.error("Error when table creation!", error);
    });
  }

  executeSql(statement: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.then((storage: SQLiteObject) => {
        storage.executeSql(statement, params).then((data) => {
          resolve(this.getRows(data));
        }, error => {
          reject(error);
        }).catch((error) => {
          AppLogger.error("Execute Sql Error", error);
        })
      }).catch((error) => {
        AppLogger.error("Database Error", error);
      })
    });
  }

  sqlBatch(sqlStatements: Array<string | string[]>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.then((storage: SQLiteObject) => {
        storage.sqlBatch(sqlStatements).then(() => {
          resolve(true);
        }, error => {
          reject(error);
        }).catch((error) => {
          AppLogger.error("Execute Sql Error", error);
        })
      }).catch((error) => {
        AppLogger.error("Database Error", error);
      })
    });
  }

  private getRows(data: any): Array<any> {
    let formattedData = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        formattedData.push(data.rows.item(i));
      }
    }
    return formattedData;
  }
}
