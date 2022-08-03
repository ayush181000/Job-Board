const endpointURL = 'http://localhost:9000/graphql';

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join('\n');
    throw new Error(message);
  }
  return responseBody.data;
}

export async function loadJobs() {
  const query = `{
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }`;
  const { jobs } = await graphqlRequest(query);
  return jobs;
}

export async function loadJob(jobId) {
  const query = `query JobQuery($id: ID!){
  job(id: $id) {
    id
    title
    company {
      id
      name
    }
    description
  }
}`;

  const { job } = await graphqlRequest(query, { id: jobId });
  return job;
}

export async function createJob(input) {
  const mutation = `mutation CreateJob( $input:CreateJobInput){
  job : createJob(input: $input)
    {
      id
      title
    }
}`;
  const { job } = await graphqlRequest(mutation, { input });
  return job;
}

export async function loadCompany(companyId) {
  const query = `query CompanyQuery( $id: ID!){
  company(id: $id) {
    id
    name
    description
    jobs{
      id
      title
    }
  }
}`;

  const { company } = await graphqlRequest(query, { id: companyId });
  return company;
}
