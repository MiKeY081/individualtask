import { prisma } from "../config.js/prismaCongfig.js";

const createTask = async (req, res) => {
  const { id } = req.user;
  const { task } = req.body;
  try {
    const todo = await prisma.task.create({
      data: {
        task,
        user: {
          connect: { id },
        },
      },
    });
    res.send({
      success: true,
      message: "Task created successfully",
      todo,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getTask = async (req, res) => {
  const { id } = req.user;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {task:  {orderBy: {createdAt: "desc"}}}
  });
  try {
    res.send({
      success: true,
      message: "Getting Tasks if available",
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}

const deleteTask = async ( req, res ) =>{
    const {id} = req.params
    try{
    const task = await prisma.task.delete({where: {id}})
        res.send({
            success: true,
            message: "Task deleted Successfully",
            task
        })
    }catch(error){
        res.send({
            success: false,
            message: error.message
     })
}
}

const updateTask = async ( req, res ) =>{
    const {id} = req.params
    const {task} = req.body
    console.log(task)
    try{
        const todo= await prisma.task.update({
           where:{id},
           data:{task},
        })
        res.send({
            success: true,
            message: "Task edited Sucessfully",
            todo
        })
    }catch(error){
        res.send({
            success: false,
            message: error.message
     })
}
}

export { createTask, getTask, deleteTask, updateTask };
