type FileUpLoadProps = {
    handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFiles: string[];
};

function FileUpLoad ({ handleFile, selectedFiles }) {
    return (
        <>
        <h2>Загрузить CSV</h2>
        <input
            type="file" 
            accept=".csv"
            multiple onChange={handleFile}
        />
        {selectedFiles.length > 0 && (
            <p>Выбрано файлов: {selectedFiles.length}
                ({selectedFiles.join(", ")})
            </p>
        )}    
        </>
    )
}

export default FileUpLoad