import React from 'react';
import axios from 'axios';
import { errorProcessing } from '../../utils';
import { CONTENT_EDIT } from '../../queries';
import './content-tools.min.css';
import './DocumentsEditPage.scss';

class DocumentsEditPage extends React.Component {
  static path = '/documents-edit';

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get(CONTENT_EDIT)
      .then(res => {
        let newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.setAttribute('id', 'contentEditScript');
        newScript.text = res.data.data;
        document.head.insertBefore(
          newScript,
          document.getElementsByTagName('title')[0]
        );

        let serverDocument = document.createElement('p');
        serverDocument.innerHTML = res.data.htmlData;
        this.editRegion.appendChild(serverDocument);

        var editor = window.ContentTools.EditorApp.get();
        editor.init('*[data-editable]', 'main-content');
      })
      .catch(e => {
        errorProcessing(e);
      });
  }

  componentWillUnmount() {
    const cEdit = document.getElementById('contentEditScript');
    cEdit.parentNode.removeChild(cEdit);
    document.body.removeChild(document.querySelector('.ct-app'));
  }

  uploadDocument = e => {
    let formData = new FormData();
    formData.append('document', e.target.files[0]);

    axios
      .post(CONTENT_EDIT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        let serverDocument = document.createElement('p');
        serverDocument.innerHTML = res.data.htmlData;
        this.editRegion.innerHTML = '';
        this.editRegion.appendChild(serverDocument);
      })
      .catch(e => {
        errorProcessing(e);
      });
  };

  render() {
    return (
      <>
        <div className="main-content">
          <form>
            <label>
              Загрузить DOCX документ:
              <br />
              <input type="file" onChange={this.uploadDocument} />
            </label>
          </form>
        </div>
        <div
          className="main-editable-content mdc-elevation--z8"
          data-editable
          data-name="main-content"
          ref={node => {
            this.editRegion = node;
          }}
        />
      </>
    );
  }
}

export default DocumentsEditPage;
