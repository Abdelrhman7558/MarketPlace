import { NextRequest, NextResponse } from 'next/server';



// This route bypasses Next.js body parser limits for large file uploads
export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('authorization') || '';

        // Forward the request body as-is to the backend
        const backendUrl = 'http://localhost:3001/products/bulk-upload';

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'authorization': token,
                'content-type': request.headers.get('content-type') || '',
            },
            body: request.body,
            // @ts-ignore - duplex is needed for streaming request bodies
            duplex: 'half',
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error: any) {
        console.error('[API Route] Bulk upload proxy error:', error);
        return NextResponse.json(
            { message: error.message || 'Upload proxy failed', totalRows: 0, successCount: 0, errorCount: 0, results: [] },
            { status: 500 }
        );
    }
}
