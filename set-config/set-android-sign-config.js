import { readFileSync, writeFileSync } from 'fs';
import { exit } from 'process';

const filePath = './src-tauri/gen/android/app/build.gradle.kts';

var content = readFileSync(filePath).toString();

var insertPoint = findInsertPoint('\r\n', content);
content = content.substring(0, insertPoint) + 'import java.io.FileInputStream\r\n' + content.substring(insertPoint);

const signingConfigs = `
    signingConfigs {
        create("release") {
            val keystorePropertiesFile = rootProject.file("key.properties")
            val keystoreProperties = Properties()
            if (keystorePropertiesFile.exists()) {
                keystoreProperties.load(FileInputStream(keystorePropertiesFile))
            }

            keyAlias = keystoreProperties["keyAlias"] as String
            keyPassword = keystoreProperties["keyPassword"] as String
            storeFile = file(keystoreProperties["storeFile"] as String)
            storePassword = keystoreProperties["storePassword"] as String
        }
    }
`;

var insertPoint = findInsertPoint('    buildTypes {', content, 'before');
content = content.substring(0, insertPoint) + signingConfigs + content.substring(insertPoint);

var insertPoint = findInsertPoint('getByName("release") {\r\n', content, 'after');
content = content.substring(0, insertPoint) + '            signingConfig = signingConfigs.getByName("release")\r\n' + content.substring(insertPoint);

//content = content.replace('jvmTarget = "1.8"', 'jvmTarget = "21"');

writeFileSync(filePath, content);


function findInsertPoint(pattern, content, mode = 'after')
{
    var patternIndex = content.indexOf(pattern);
    if (patternIndex === -1)
    {
        console.error(`Can't find pattern: ${pattern}`)
        exit;
    }
    var insertPoint = -1;
    if (mode === 'before')
    {
        insertPoint = patternIndex;
    }
    else if (mode === 'after')
    {
        insertPoint = patternIndex + pattern.length;
    }
    return insertPoint;
}