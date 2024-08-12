import Address from "../models/address";

export async function createAddress(name,phone_number,postal_address,email, order_id) {
    let newAddress = Address.build({name, phone_number,postal_address, email,order_id});
  
    return await newAddress.save();
}


export async function getAddressByPk(address_id) {
    return await Address.findByPk(address_id)
  
  }
  
  
  export async function getAllAddresses() {
    return await Product.findAll()
  }

  