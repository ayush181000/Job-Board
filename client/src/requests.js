const endpointURL = 'http://localhost:9000/graphql';

export async function loadJobs() {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }`,
    }),
  });

  const responseBody = await response.json();
  return responseBody.data.jobs;
}

export async function loadJob(jobId) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `query JobQuery($id: ID!){
  job(id: $id) {
    id
    title
    company {
      id
      name
    }
    description
  }
}`,
      variables: { id: jobId },
    }),
  });

  const responseBody = await response.json();
  return responseBody.data.job;
}