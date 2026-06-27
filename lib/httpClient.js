//?tambien podría llamarse fetcher y colocarlo en /lib/fectcher.js
export async function httpClient(endpoint,options={}) {
    const baseUrl='https://jsonplaceholder.typicode.com'
    const response = await fetch(`${baseUrl}${endpoint}`,options);
    if (!response.ok) {
        //const errorText = await res.text();
        // throw new Error(`Error ${res.status}: ${errorText}`

        throw new Error(`Error en petición: ${response.status}`);
    }
    return response.json()
    
}