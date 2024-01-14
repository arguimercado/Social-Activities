import { useEffect, useState } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'
import DropzoneWidget from './DropzoneWidget'
import CropperWidget from './CropperWidget'

const PhotoUploadWidget = () => {
  
  const [files,setFiles] = useState<any[]>([]);
  const [cropper,setCropper] = useState<Cropper>();


  function onCrop() {
    if(cropper) {
      cropper.getCroppedCanvas().toBlob((blob: any) => console.log(blob))
    }
  }

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  },[files])
  
  return (
    <Grid>
        <Grid.Column width={4}>
            <Header sub color='teal' content='Step 1 - Add Photo' />
            <DropzoneWidget setFiles={setFiles}/>

        </Grid.Column>
        <Grid.Column width={4}>
            <Header sub color='teal' content='Step 1 - Resize Image' />
            {files && files.length > 0 && ( 
              <CropperWidget setCropper={setCropper} imagePreview={files[0].preview} />
            )}
        </Grid.Column>
        <Grid.Column width={4}>
            <Header sub color='teal' content='Step 1 - Add Photo' />
            {files.length > 0 && (
              <>
                <div className='img-preview' style={{minHeight: 200,overflow: 'hidden'}} />
                <Button.Group widths={2}>
                  <Button onClick={onCrop} positive icon='check' />
                  <Button onClick={() => setFiles([])} icon='close' />
                </Button.Group>
              </>
            )}

            
        </Grid.Column>
    </Grid>
  )
}

export default PhotoUploadWidget