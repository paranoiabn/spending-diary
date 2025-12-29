function FileUpLoad ({ handleFile }) {
    return (
        <>
        <h2>Загрузить CSV</h2>
        <input type="file" accept=".csv" onChange={handleFile} />
        </>
    )
}

export default FileUpLoad