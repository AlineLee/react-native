import { Lottery, Register } from '../types';

export async function createLottery({
  name,
  prize,
}: {
  name: string;
  prize: string;
}): Promise<Lottery> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/lotteries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'simple',
        name,
        prize,
      }),
    });

    const body = (await response.json()) as Lottery;

    return body;
  } catch (e) {
    console.error('Error:', e);
    throw e;
  }
}

export async function getLotteries(): Promise<Lottery[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/lotteries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = (await response.json()) as Lottery[];
    return body;
  } catch (e) {
    console.error('Error:', e);
    throw e;
  }
}

export async function registerLotteries(values: Register): Promise<Register> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lotteryId: values.lotteryId,
        name: values.name,
      }),
    });

    const body = (await response.json()) as Register;
    return body;
  } catch (e) {
    console.error('Error:', e);
    throw e;
  }
}
