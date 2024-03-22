import { TreeData } from './data/TreeData'
import { TreeWalker } from './classes/TreeWalker'
import { TreeNodeHandler } from './classes/TreeNodeHandler'

async function run(): Promise<void> {
    const data = TreeData.getData()

    const walker = new TreeWalker()
    await walker.init(data)
    
    const nodeHandler = new TreeNodeHandler()
    await walker.reverseWalk(nodeHandler)

}

run().catch(err => {
    console.log(err)
})
