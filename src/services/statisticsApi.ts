const BASE_URL = 'https://app.edux.center/Stats';

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
    const response = await fetch(`${BASE_URL}/GetTotalUsersCount`, {
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
    
    const response = await fetch(`${BASE_URL}/GetUsersCountByRegion?${params.toString()}`, {
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
    
    const response = await fetch(`${BASE_URL}/GetUsersCountByDistrict?${params.toString()}`, {
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
    
    const response = await fetch(`${BASE_URL}/GetUsersCountByOrganization?${params.toString()}`, {
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
