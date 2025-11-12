import { http, HttpResponse, delay } from 'msw';

export interface User {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'inactive';
}

export const handlers = [
    // GET /api/users - List users
    http.get('/api/users', async () => {
        await delay(500); // Simulate network delay

        return HttpResponse.json<User[]>([
            { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive' },
        ]);
    }),

    // GET /api/users/:id - Get single user
    http.get('/api/users/:id', async ({ params }) => {
        await delay(300);

        const userId = Number(params.id);

        if (userId === 999) {
            return new HttpResponse(null, {
                status: 404,
                statusText: 'User not found',
            });
        }

        return HttpResponse.json<User>({
            id: userId,
            name: `User ${userId}`,
            email: `user${userId}@example.com`,
            status: 'active',
        });
    }),

    // POST /api/users - Create user
    http.post('/api/users', async ({ request }) => {
        await delay(400);

        const newUser = await request.json() as Omit<User, 'id'>;

        return HttpResponse.json<User>(
            {
                id: Math.floor(Math.random() * 1000),
                ...newUser,
            },
            { status: 201 }
        );
    }),
];