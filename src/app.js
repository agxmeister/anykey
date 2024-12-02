import Chat from "./chat";
import Recorder from "./recorder";
import QqDetector from "./qr";
import * as styles from './app.module.sass';
import Test from "./test";

export default function App()
{
    return (
        <div className={styles.app}>
            <Chat/>
            <Recorder/>
            <QqDetector/>
            <Test attr={"Hello"}/>
        </div>
    );
}
