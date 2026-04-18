const BASE_URL = 'https://app.edux.center/api/stats';

/** Origin for Stats controller (same host as Swagger). Override with NEXT_PUBLIC_EDUX_API_ORIGIN if needed. */
const EDUX_API_ORIGIN =
  typeof process.env.NEXT_PUBLIC_EDUX_API_ORIGIN === 'string' &&
  process.env.NEXT_PUBLIC_EDUX_API_ORIGIN.trim().length > 0
    ? process.env.NEXT_PUBLIC_EDUX_API_ORIGIN.replace(/\/$/, '')
    : 'https://app.edux.center';

/** GET /api/Stats/GetTopPerformersReport — query: grade?, size (required, default 10), e.g. ?size=10 */
const TOP_PERFORMERS_REPORT_PATH = '/api/Stats/GetTopPerformersReport';

export type TopPerformerReportRow = Record<string, string | number | null | undefined>;

/** Backend may return a bare array or { value: [...], Count?: number } */
export type TopPerformersReportPayload =
  | TopPerformerReportRow[]
  | { value: TopPerformerReportRow[]; Count?: number };

function normalizeTopPerformersPayload(data: unknown): TopPerformerReportRow[] {
  if (Array.isArray(data)) {
    return data as TopPerformerReportRow[];
  }
  if (
    data !== null &&
    typeof data === 'object' &&
    Array.isArray((data as { value?: unknown }).value)
  ) {
    return (data as { value: TopPerformerReportRow[] }).value;
  }
  return [];
}

export async function getTopPerformersReport(options: {
  grade?: number;
  size?: number;
}): Promise<TopPerformerReportRow[]> {
  const size = options.size ?? 10;
  try {
    const params = new URLSearchParams();
    params.append('size', String(size));
    if (options.grade !== undefined) {
      params.append('grade', String(options.grade));
    }

    const url = `${EDUX_API_ORIGIN}${TOP_PERFORMERS_REPORT_PATH}?${params.toString()}`;

    const response = await fetch(url, {
      headers: { accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const raw = (await response.json()) as unknown;
    return normalizeTopPerformersPayload(raw);
  } catch (error) {
    console.error('Error fetching top performers report:', error);
    return [];
  }
}

export interface ApiRegionCount {
  regionId: number;
  regionName: string;
  count: number;
}

export interface ApiDistrictCount {
  districtId: number;
  districtName: string;
  regionId: number;
  regionName: string;
  count: number;
}

export interface ApiOrganizationCount {
  organizationId: number;
  organizationName: string;
  districtId: number;
  districtName: string;
  regionId: number;
  regionName: string;
  count: number;
}

/**
 * Get total users count
 */
export async function getTotalUsersCount(): Promise<number> {
  try {
    const response = await fetch(`${BASE_URL}/gettotaluserscount`, {
      headers: {
        'accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return typeof data === 'number' ? data : 0;
  } catch (error) {
    console.error('Error fetching total users count:', error);
    return 0;
  }
}

/**
 * Get users count by region
 * @param grade Optional grade filter
 * @param size Number of results (default: 10)
 */
export async function getUsersCountByRegion(
  grade?: number,
  size: number = 10
): Promise<ApiRegionCount[]> {
  try {
    const params = new URLSearchParams();
    if (grade !== undefined) {
      params.append('grade', grade.toString());
    }
    params.append('size', size.toString());
    
    const response = await fetch(`${BASE_URL}/getuserscountbyregion?${params.toString()}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching users count by region:', error);
    return [];
  }
}

/**
 * Get users count by district
 * @param regionId Optional region ID filter
 * @param grade Optional grade filter
 * @param size Number of results (default: 10)
 */
export async function getUsersCountByDistrict(
  regionId?: number,
  grade?: number,
  size: number = 10
): Promise<ApiDistrictCount[]> {
  try {
    const params = new URLSearchParams();
    if (regionId !== undefined) {
      params.append('regionId', regionId.toString());
    }
    if (grade !== undefined) {
      params.append('grade', grade.toString());
    }
    params.append('size', size.toString());
    
    const response = await fetch(`${BASE_URL}/getuserscountbydistrict?${params.toString()}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching users count by district:', error);
    return [];
  }
}

/**
 * Get users count by organization (school)
 * @param regionId Optional region ID filter
 * @param grade Optional grade filter
 * @param size Number of results (default: 10)
 */
export async function getUsersCountByOrganization(
  regionId?: number,
  grade?: number,
  size: number = 10
): Promise<ApiOrganizationCount[]> {
  try {
    const params = new URLSearchParams();
    if (regionId !== undefined) {
      params.append('regionId', regionId.toString());
    }
    if (grade !== undefined) {
      params.append('grade', grade.toString());
    }
    params.append('size', size.toString());
    
    const response = await fetch(`${BASE_URL}/getuserscountbyorganization?${params.toString()}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching users count by organization:', error);
    return [];
  }
}
