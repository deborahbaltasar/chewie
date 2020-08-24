import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#737bac',
    borderStyle: 'dashed',
    backgroundColor: 'none',
    color: '#fff',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};
  
const activeStyle = {
    borderColor: '#2196f3'
};
  
const acceptStyle = {
    borderColor: '#00e676'
};
  
const rejectStyle = {
    borderColor: '#ff1744'
};
  
export default function StyledDropzone(props) {
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
      acceptedFiles
} = useDropzone();
  
const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
}), [
    isDragActive,
    isDragReject,
    isDragAccept
]);

const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
    </li>
));
  
    return (
      <div className="container">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p className="p-container">Arraste seu arquivo para esse campo ou clique para selecioná-lo </p>
        </div>
        <aside>
            <h4>Arquivos selecionados: </h4>
            <ul>{files}</ul>
       </aside>
      </div>
    );
  }
  

// export default function Dropzone(props) {
//   const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
//   const files = acceptedFiles.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));

//   return (
//     <section className="container">
//       <div {...getRootProps({className: 'dropzone'})}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//       <aside>
//         <h4>Files</h4>
//         <ul>{files}</ul>
//       </aside>
//     </section>
//   );
// }

