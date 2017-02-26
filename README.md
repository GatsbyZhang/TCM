# React 示例项目 

***

## <a name="architecture">&sect; 项目架构</a>
### <a name="tree">⊙ 目录结构</a>
```
.
├─ build/            # Webpack 配置目录
├─ dist/             # build 生成的生产环境下的项目
├─ src/              # 源码目录（开发都在这里进行）
│   ├─ assets/         # 放置需要经由 Webpack 处理的静态文件
│   ├─ common/         # 公共组件（COMMON）
│   ├─ components/     # 组件（COMPONENT）
│   ├─ redux/          # Redux 相关内容
│   │   ├─ actions/      # （ACTION）
│   │   ├─ reducers/     # （reducers）
│   │   ├─ store/        # （STORE）
│   │   ├─ constants/    #  (CONSTANTS)
│   ├── views/         # 视图基页（VIEW）
│   ├── app.js         # 启动文件
│   ├── index.html     # 静态基页
├── static/          # 放置无需经由 Webpack 处理的静态文件
├── .babelrc         # Babel 转码配置
├── .eslintignore    # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc        # ESLint 配置
├── .gitignore       # （配置）需被 Git 忽略的文件（夹）
├── package.json     # （这个就不用多解释了吧）
```

> 您可以根据业务需求改动目录结构。若目录使用频繁，建议配置 [路径别名](#alias)  
> 默认的路径别名见上面目录结构注释中大写形式的常量

> 有关 Redux DevTools 与 why-did-you-update 的启用与禁用，见下面的 [开发环境全局变量](#dev-global-vars) 配置

***

## <a name="development">&sect; 开发</a>
### <a name="webpack-configure">⊙ Webpack 配置</a>

> 由于已经拥有相对成熟的 Webpack 配置，因此在一定程度上您可以不求甚解，但了解其配置会更能把握整体开发  
>TCM的webpack配置文件包括webapck.config.base.js、webapck.config.dev.js、webapck.config.prod.js三个基本文件，
 >webpack.config.base.js是基本配置文件，webpack.config.dev.js是开发配置，webpack.config.prod.js是产品配置文件，
 >webpack.config.base.js包含一些webpack.config.prod.js和webpack.config.base.js共有的基本配置，
 >而webpack.config.prod.js和webpack.config.base.js在webpack.config.base.js的基础上添加了一些必要配置。
 >为了引入Node的express API，通过dev.js和prod.js对顶层配置进行定义，因此，最后的package.json文件包含了开发和生产阶段
 >的不同指令对应的不同配置文件。
* 前端开发服务器为 `localhost:9090`，可在 `build/webpack.dev.conf.js` 中找到
> 后端 RESTful API 基地址写在了 `src/services/xhr/config.js` 中，请根据实际自行修改

* 框架 / 类库 须分离打包以加快开发时的编译速度并有利于缓存，详见 `build/webpack.base.conf.js` 中的 `vendor`
> 实际上该步骤可通过读取 `package.json` 的 `dependencies` 字段实现自动化，但其灵活度不够高，必要性也不大  
> P.S. 安装包时勿忘 `--save / --save-dev` 以添加依赖记录

* <a name="alias">**路径别名**</a> 的定义位于 `build/webpack.base.conf.js`，好处就是**引入与重构都很方便**
> 例如，在某组件中，引入 `userService` 需要 `import userService from '../../../services/userService'`  
> 但有了路径别名后，只需要 `import userService from 'SERVICE/userService'`  

* 开发环境<a name="dev-global-vars">**全局变量**</a>，由 `webpack.DefinePlugin` 提供（详见 `build/webpack.base.conf.js`）
> 默认有 `__DEV__` / `__PROD__` / `__COMPONENT_DEVTOOLS__` / `__WHY_DID_YOU_UPDATE__` 四个全局变量  
> 若要继续添加，则还需要在 `.eslintrc` 中 `globals` 同步写入

> 在此需要提醒，在 `package.json` 中设置 `NODE_ENV` 要注意末尾空格的[问题](http://stackoverflow.com/questions/11104028/#38948727)  
> 最好就是使用前 `trim` 一下：`process.env.NODE_ENV.trim()`

