// this file is used for customizing all the elements of the html
import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document{
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <div id="overlays"/>
                    <Main />
                    <NextScript />
                </body>
            </Html>

        );
    }
}

export default MyDocument

// default settings before
// class MyDocument extends Document{
//     render() {
//         return (
//             <Html>
//                 <Head />
//                 <body>
//                     <Main />
//                     <NextScript />
//                 </body>
//             </Html>

//         );
//     }
// }