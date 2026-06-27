import { httpClient } from "@/lib/httpClient";

export async function getAllPosts() {
    return await httpClient('/posts',{next:{revalidate:3600}})
}