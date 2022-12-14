# NodeJS Cluster 🔥

## What is NodeJS Cluster?

Node. js runs single threaded programming, which is very memory efficient, but to take advantage of computers multi-core systems, the Cluster module allows you to easily create child processes that each runs on their own single thread, to handle the load.

## What is Blocking and Non-blocking operations?

Blocking refers to operations that block further execution until that operation finishes while non-blocking refers to code that doesn't block execution. Or as Node. js docs puts it, blocking is when the execution of additional JavaScript in the Node. js process must wait until a non-JavaScript operation completes.

## NodeJs Cluster modules

- A single instance of nodejs run in a single thread
- Cluster module allows to take advantage of multi-core system
- It help to create child process which shares server ports

<img src="./images/Screenshot_1.png">

## Working of Cluster

- Worker processes are spawned using the fork() method
- These processes can communicate with parent via **IPC**
- They can also communicate from parent to child and child to parent.
- The cluster module supports two methods for distributing incoming connections
  - **Round Robin**
    - This is default on all platforms except windows.
    - The master process listen on a PORT, accepts a new connection and distribute them across the workers in a round-robin fashion
  - Second Method
    - The master process create the listen socket and sends it to interested workers
    - The workers then accept incoming connections directly

### What is IPC

The high-speed **interprocess communication** (IPC) interconnect is a high-bandwidth, low latency communication facility that links the nodes in the cluster. The interconnect routes messages and other cluster communications traffic to coordinate each node's access to resources.

### Cluster Methods, Properties and Events

- **There are several events which can handle during NodeJS clustering**
  - Online, Fork, Message, Disconnect, Exit etc
- **Methods**
  - Disconnect, Fork etc
- **Properties**
  - isMaster, IsWorker etc

### Worker Class Methods, Properties and Events

- **There are several events which can handle provide by Worker class**
  - Online, Message, Disconnect, Exit etc
- **Methods**
  - Disconnect, IsConnected, IsDead, Kill, Send etc.
- **Properties**
  - Id, Process etc.

### How to get CPU count?

- To know how many logical CPU are available in our machine, we can make use of **OS module**
  - os.cpus()
    - Returns an array of objects containing information about each logical CPU core
  - os.cpus().length
    - Return the count of logical CPUs

## NodeJs Cluster Load Test

- **To load test Nodejs cluster , install 'loadtest' packege using npm install commend**
- The commend will be:
  - loadtest -n 100 -c 100 --rps 200 http://localhost:4000?number=10
- **Artillery: While using artillery, we can use number of parameters like**
  - quick : used for add-hoc testing
  - --count : used for creating virtual users
  - -n : number of request per virtual user.
- The commend will be
  - artillery quick --count 10 -n 20 http://localhost:4000?number=20

## PM2

### What is PM2

PM2 is a production process manager for Node. js applications with a built-in load balancer.PM2 enables you to keep applications alive forever, reloads them without downtime, helps you to manage application logging, monitoring, and clustering.

- PM2 is a production process manager for nodejs applications with build in load-balancer
- PM2 allows to
  - keep application alive forever
  - Reload them without downtime
  - Facilitate common system admin task link
    - monitoring, stopping, deleting processes etc

#### PM2 working

- PM2 make usage of nodejs cluster module
- The scaled application's child processes can automatically share server ports
- You can start nodejs application using PM2 by using
  - commend line option
  - process configuration file [js/yaml/json file]

#### Creating Process file

- You can create a process file to
  - Fine-tune the behavior
  - Options
  - Environment Variables
  - Log files of each applications
- To create a process file use commend
  - pm2 ecosystem
- After creating a process file , use command
  - pm2 [start|reset|stop|delete] ecosystem.config.js

```js
module.exports = {
  apps: [
    {
      name: "Express App",
      script: "index.js",
      instances: "MAX",
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
```

#### PM2 Commands

- PM2 start command
  - pm2 start ecosystem.config.js
- To monitor the process
  - pm2 monit
- To stop any/all process
  - pm2 stop all/app-name
- To delete any/all process
  - pm2 delete all/app-name
- To list all applications
  - pm2 list

## Child Process

### child_process.fork() method

- The fork() method return an instance of ChildProcess object
  - It implements the nodejs eventEmitter API which allows parent process to register listener functions
- When certain events occurs in the lifecycle of child process, these listener function will get executed

- The childProcess Object has build-in communication channel which is IPC [Inter process communication channel]
- Using this channel , message ca be send back and forth between parent and child
- Each process has it's own memory with their own V\* engine
- Note
  - **Because of additional resource allocation, spawning large number of Node JS processes is not recommended**

<img src="http://davidvgalbraith.com/wp-content/uploads/2016/01/Screen-Shot-2016-01-03-at-4.56.07-PM-1024x543.png"/>
<img src="https://miro.medium.com/max/1400/1*XjARU57S6Fzcz2Ae04oz3w.png"/>
<img src="https://vietcanho.files.wordpress.com/2016/05/cp_methods1.png?w=784&h=737"/>
