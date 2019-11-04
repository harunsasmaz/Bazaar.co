import app from './app';
import {config} from './_config/config'

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log('Server is ready on ' + PORT);
});
