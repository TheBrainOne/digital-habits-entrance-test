import React, { Component } from "react";
import {
  FolderOutlined,
  FileJpgOutlined,
  FileZipOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import Api from "../../Api";

import IFolder from "./IFolder";

import "./Folder.css";

export default class Folder extends Component<
  IFolder,
  { data: IFolder | null }
> {
  constructor(props: IFolder) {
    super(props);

    this.state = { data: null };
  }

  toggle(event: any) {
    if (this.isOpened()) {
      return this.closeFolder(event);
    }

    this.openFolder(this.props.id);
  }

  openFolder(folderId: number) {
    if (!this.isTogglePossible()) {
      return;
    }

    console.log(this.props.id);
    const api = new Api();
    api.getCurrentFoldersList(folderId).then((data) => {
      this.setState({
        data,
      });
    });
  }

  closeFolder(event: any) {
    event.target.nextElementSibling.classList.toggle("folder_hide");
  }

  isOpened() {
    return this.state && this.state.data;
  }

  isTogglePossible() {
    return this.props.children;
  }

  setIcon(ext: string) {
    const [, fileExtension] = ext.split(".");

    switch (fileExtension) {
      case "jpg":
        return <FileJpgOutlined className="folder__icon" />;

      case "zip":
        return <FileZipOutlined className="folder__icon" />;

      case "epub":
        return <FileTextOutlined className="folder__icon" />;

      default:
        return <FolderOutlined className="folder__icon" />;
    }
  }

  render() {
    return (
      <div>
        <div onClick={(event) => this.toggle(event)} className="folder__item">
          {this.setIcon(this.props.title)}
          {this.props.title}
        </div>
        {!this.state || !this.state.data || !this.state.data.children ? (
          ""
        ) : (
          <div className="folders-list">
            {this.state.data.children.map((folder: IFolder) => (
              <Folder
                key={folder.id}
                id={folder.id}
                title={folder.title}
                children={folder?.children}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
