import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

interface Props {
  setFiles: (files: any) => void;
}

function DropzoneWidget({ setFiles }: Props) {
  const dzStyle = {
    dropIn: {
      border: "dashed 3px #eee",
      borderRadius: "5px",
      padding: "30px",
      textAlign: "center" as "center",
    },
    dropActive: {
      border: "dashed 3px green",
    },
  };

  
	const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles.map((file : any) => Object.assign(file, {
			preview: URL.createObjectURL(file)
		})))
  }, [setFiles]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyle.dropIn,...dzStyle.dropActive} : {...dzStyle.dropIn}} >
      <input {...getInputProps()} />
			<Icon name='upload' size='huge' />
			<Header content='Drop image here' />
    </div>
  );
}

export default DropzoneWidget;
