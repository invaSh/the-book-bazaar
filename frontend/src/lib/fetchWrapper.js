const baseUrl = import.meta.env.VITE_API_URL;

let token;

export function setFetchToken(t) {
  token = t;
}

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const networkErrorResponse = {
  error: {
    status: 0,
    message: 'Network error - failed to connect to server',
    errors: [
      {
        code: 'network_error',
        message: 'Failed to connect to server',
        path: ['network'],
        validation: 'connection',
      },
    ],
  },
};

async function handleResponse(response) {
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = text;
  }

  if (response.ok) {
    return data;
  } else {
    const error = {
      status: response.status,
      message: data || response.statusText,
      url: response.url,
      headers: response.headers,
    };
    return { error };
  }
}

async function get(url) {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
    headers: getHeaders(),
  };
  try {
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
  } catch (e) {
    return networkErrorResponse;
  }
}

async function post(url, data) {
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: getHeaders(),
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
  } catch (e) {
    return networkErrorResponse;
  }
}

async function post(url, data) {
  const requestOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: getHeaders(),
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
  } catch (e) {
    return networkErrorResponse;
  }
}

async function del(url) {
  const requestOptions = {
    method: 'DELETE',
    credentials: 'include',
    headers: getHeaders(),
  };
  try {
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
  } catch (error) {
    return networkErrorResponse;
  }
}

async function patch(url, data) {
  const requestOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: getHeaders(),
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
  } catch (error) {
    return networkErrorResponse;
  }
}

export const fetchWrapper = {
  get,
  post,
  put,
  del,
  patch,
};
