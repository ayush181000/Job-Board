const db = require('./db');

const Query = {
  company: (root, { id }) => db.companies.get(id),
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
};

const Mutation = {
  createJob: (root, { input }, { user }) => {
    if (!user) {
      throw new Error('Unauthorized');
    }

    const id = db.jobs.create({ companyId: user.companyId, ...input });
    return db.jobs.get(id);
  },
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Job, Company, Mutation };
