import { useState } from "react";
import { AppForm } from "./components/AppForm";
import { AppButton } from "./components/AppButton";
import { DownloadIcon } from "./components/icons/DownloadIcon";
import {
  exportContractContentsToZip,
  getContractContentList,
  getContractSourceCode,
} from "./lib/helpers";

function App() {
  const [contract, setContract] = useState({
    address: "",
    contents: [],
  });
  const fetchContract = async (apiKey, contractAddress) => {
    const result = await getContractSourceCode(apiKey, contractAddress);
    const sourceCodes = result.data.result;
    const contractContents = getContractContentList(sourceCodes);
    setContract({
      address: contractAddress,
      contents: contractContents,
    });
  };

  const downloadContract = () => {
    exportContractContentsToZip(contract.contents, contract.address);
  };

  return (
    <div className="md:px-10 px-4 pt-8 w-full">
      <h1 className="text-2xl font-semibold tracking-widest text-center pb-4">
        Contract Downloader
      </h1>
      <div className="flex justify-center w-full">
        <div className="border-2 md:px-8 px-2 py-4 rounded-sm lg:w-2/5 md:w-3/5 w-full">
          <AppForm submitForm={fetchContract} />
        </div>
      </div>
      <hr className="my-6" />

      <AppButton onClick={downloadContract}>
        <div className="flex gap-2">
          <DownloadIcon />
          <span>Download Contract</span>
        </div>
      </AppButton>
      {contract.address}
    </div>
  );
}

export default App;