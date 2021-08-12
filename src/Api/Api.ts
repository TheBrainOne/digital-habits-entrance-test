export class Api {
  private dHabitsAPI = "http://164.90.161.80:3000/api";

  private async getData(url: string) {
    const res = await fetch(`${this.dHabitsAPI}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}.`);
    }

    const data = await res.json();

    console.log(data);

    return data;
  }

  public getRootFoldersList() {
    return this.getData("/content");
  }

  public getCurrentFoldersList(id: number) {
    return this.getData(`/content?dirId=${id}`);
  }
}
