import { AddAccountRepository } from "@/data/protocols/add-account-repository";
import { AccountModel } from "@/domain/models/account";
import { AddAccountModel } from "@/domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

interface MongoAccountModel extends Omit<AccountModel, "id"> {
  _id: string;
}

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("account");
    const { insertedId } = await accountCollection.insertOne(accountData);

    const response = await accountCollection.findOne<MongoAccountModel>(insertedId);

    if (response) {
      const { _id, ...accountWithoutId } = response;
      const account = {
        id: _id,
        ...accountWithoutId,
      } as AccountModel;

      return account;
    }

    return Promise.reject();
  }
}
