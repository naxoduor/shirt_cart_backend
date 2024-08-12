import {getAllAddresses, getAddressByPk, createAddress} from '../db/address'

export const  getAddresses = async (req, res) => {
    try {
      res.send(await getAllAddresses());
    } catch (error) {
      res.send(error);
    }
}
