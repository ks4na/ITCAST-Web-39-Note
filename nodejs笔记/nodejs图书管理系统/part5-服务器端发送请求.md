# 服务器端发送请求

- [http](#http)
- [接口返回的不是UTF8格式](#接口返回的不是utf8格式)

## http

```js
const http = require('http')

// 示例api: 查询天气，101191204是城市代码
const url = 'http://www.weather.com.cn/data/cityinfo/101191204.html'

const req = http.request(url, res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(`headers: ${res.headers}`)
    
    let responseBody = ''
    res.on('data', chunk => {
        responseBody += chunk
    })
    
    res.on('end', () => {
        console.log(`responseBody: ${responseBody}`)
    })
})

req.on('error', e => {
    console.log(`request failed: ${e.message}`)
})

// 必须要调用end方法
req.end()
```

> 详细用法，如POST请求写法等，详见Node.js的API文档。

## 接口返回的不是UTF8格式

如果不是返回utf8格式编码的数据，在data事件中应该直接接收Buffer数组的数据，而不是用 `+=`,

`+=` 运算就已经将接收的Buffer数组调用toString转换成字符串了，并且以默认编码utf8进行的转换。

例子：

```js
const https = require('https')
const iconv = require('iconv-lite')  // iconv是转换编码的库
const url = require('url')

const urlString = 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=15251123369'

const options = url.parse(urlString)

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(`headers: ${res.headers}`)
    
    // 此接口返回格式是GBK，这里不能定义data = ''，然后data += chunk，
    // 因为在data += chunk时，就已经默认按utf8编码将chunk字节数组转换成字符串了
    let chunks = []
    res.on('data', chunk => {
        chunks.push(chunk)
    })
    
    res.on('end', () => {
        const responseBody = iconv.decode(Buffer.concat(chunks), 'gbk')
        console.log(`responseBody: ${responseBody}`)
    })
})

req.on('error', e => {
    console.log(`request failed: ${e.message}`)
})

req.end()
```



