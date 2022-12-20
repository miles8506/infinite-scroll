import { Octokit } from 'octokit';

const octokit = new Octokit();

export function requestAllRepo(username: string): Promise<any> {
  return new Promise((resolve, reject) => {
    octokit
      .request('GET /users/{username}/repos{?type,sort,direction,per_page,page}', { username })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
