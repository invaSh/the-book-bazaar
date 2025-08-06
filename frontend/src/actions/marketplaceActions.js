import { fetchWrapper } from "../lib/fetchWrapper";

export async function getMarketplaces(){
  return fetchWrapper.get('/marketplace')
}

export async function createMarketplace(data){
  return fetchWrapper.post('/marketplace', data)
}

export async function getMarketplaceProfile(id){
  return fetchWrapper.get(`/marketplace/${id}`)
}