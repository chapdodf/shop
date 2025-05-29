import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pix/${orderId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao buscar dados do PIX');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados do PIX:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados do PIX' },
      { status: 500 }
    );
  }
} 