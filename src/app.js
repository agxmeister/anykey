import Chat from "./chat";
import Recorder from "./recorder";
import QqDetector from "./qr";

export default function App()
{
    return (
        <>
            <div>This is my test React application!</div>
            <Chat/>
            <Recorder/>
            <QqDetector/>
        </>
    );
}
