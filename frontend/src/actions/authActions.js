import { fetchWrapper } from "../lib/fetchWrapper";

export async function signIn(data){
  return fetchWrapper.post('/sign-in', data)
}