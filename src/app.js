import Chat from "./chat";
import Recorder from "./recorder";
import QqDetector from "./qr";
import * as styles from './app.module.sass';

export default function App()
{
    return (
        <div className={styles.app}>
            <Chat/>
            <Recorder/>
            <QqDetector/>
        </div>
    );
}
