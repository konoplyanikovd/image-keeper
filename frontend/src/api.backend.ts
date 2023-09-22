import { eventBus } from "./utils/index";

export type FetchMethodsType  = 'POST' | 'PUT' | 'GET' | 'DELETE';

export const fetchBackend = async <T = Record<string, unknown>>(url: string, data: T | null = null, method: FetchMethodsType = 'GET') => {
    try {
        const result = await fetch(`http://localhost:3000/${url}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: method,
            body: data ? JSON.stringify(data) : undefined
        });
        return result.headers.get('Content-Type')?.includes('json') ? result.json() : result.text();
    } catch(e) {
        eventBus.emit("notification", { body: `fetch to ${url} by ${method} error`, type: 'error', title: 'We are sorry' });
        console.error(`fetch to ${url} by ${method} error: `, e);
    }
}