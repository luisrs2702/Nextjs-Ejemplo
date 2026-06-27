import { httpClient } from "@/lib/httpClient";

export async function getAllUsers() {
    return await httpClient('/users',{next:{revalidate:3600}})
}