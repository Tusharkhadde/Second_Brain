import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

// Typed API helpers
export const authApi = {
    signup: async (username: string, password: string) => {
        const response = await api.post<{ token?: string, message: string }>("/api/v1/signup", { username, password });
        return response.data;
    },
    signin: async (username: string, password: string) => {
        const response = await api.post<{ token: string, message?: string }>("/api/v1/signin", { username, password });
        return response.data;
    },
};

export const contentApi = {
    getAll: () => api.get<{ content: ContentItem[] }>("/api/v1/content"),
    add: (link: string, type: ContentType, title?: string, tags?: string[]) =>
        api.post("/api/v1/content", { link, type, title, tags }),
    delete: (contentId: string) =>
        api.delete("/api/v1/content", { data: { contentId } }),
};

export const brainApi = {
    share: (share: boolean) =>
        api.post<{ hash?: string; message?: string }>("/api/v1/brain/share", { share }),
    getShared: (sharelink: string) =>
        api.get<{ username: string; content: ContentItem[] }>(`/api/v1/brain/${sharelink}`),
};

export type ContentType = "twitter" | "youtube" | "link" | "document" | "notion";

export interface ContentItem {
    _id: string;
    link: string;
    type: ContentType;
    title?: string;
    tags?: string[];
    userId: { _id: string; username: string } | string;
    createdAt?: string;
}
