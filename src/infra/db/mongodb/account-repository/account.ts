import { AddAccountRepository } from "@/data/protocols/add-account-repository";
import { AccountModel } from "@/domain/models/account";
import { AddAccountModel } from "@/domain/usecases/add-account";
import { MongoHelper, MongoCollection } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("account");
    const { insertedId } = await accountCollection.insertOne(accountData);
    const response = await accountCollection.findOne<MongoCollection>(insertedId);

    if (response) return MongoHelper.map<AccountModel>(response);
    return Promise.reject();
  }
}
