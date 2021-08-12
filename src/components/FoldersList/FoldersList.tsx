import React, { Component } from "react";

import Api from "../../Api";

import IFolder from "../Folder/IFolder";
import IFoldersList from "./IFoldersList";

import Folder from "../Folder/Folder";

export default class FolderList extends Component<{}, IFoldersList> {
  componentDidMount() {
    const api = new Api();
    api.getRootFoldersList().then((data) => {
      this.setState({
        data,
      });
    });
  }

  render() {
    return (
      <section>
        {!this.state || !this.state.data.children
          ? "Loading..."
          : this.state.data.children.map((folder: IFolder) => (
              <Folder
                key={folder.id}
                id={folder.id}
                title={folder.title}
                children={folder?.children}
              />
            ))}
      </section>
    );
  }
}
