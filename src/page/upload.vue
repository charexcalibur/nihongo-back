<template>
  <el-form :model="questionsForm" :rules="rules" ref="questionsForm" label-width="100px" class="demo-questionsForm">
    <el-form-item label="题目编号" prop="questionId">
      <el-input v-model.number="questionsForm.questionId"></el-input>
    </el-form-item>
    <el-form-item label="题目等级" prop="questionLevel">
      <el-input v-model="questionsForm.questionLevel" placeholder="等级"></el-input>
    </el-form-item>
    <el-form-item label="题目单元" prop="questionUnit">
      <el-input v-model="questionsForm.questionUnit" placeholder="单元"></el-input>
    </el-form-item>
    <el-form-item label="题目标题" prop="questionTitle">
      <el-input v-model="questionsForm.questionTitle"></el-input>
    </el-form-item>
    <el-form-item label="选项" prop="option_1">
      <el-input v-model="questionsForm.option_1" placeholder="选项1"></el-input>
    </el-form-item>
    <el-form-item label="选项" prop="option_2">
      <el-input v-model="questionsForm.option_2" placeholder="选项2"></el-input>
    </el-form-item>
    <el-form-item label="选项" prop="option_3">
      <el-input v-model="questionsForm.option_3" placeholder="选项3"></el-input>
    </el-form-item>
    <el-form-item label="选项" prop="option_4">
      <el-input v-model="questionsForm.option_4" placeholder="选项4"></el-input>
    </el-form-item>
    <el-form-item label="答案" prop="correctAnswer">
      <el-radio v-model="questionsForm.correctAnswer" label="1">答案1</el-radio>
      <el-radio v-model="questionsForm.correctAnswer" label="2">答案2</el-radio>
      <el-radio v-model="questionsForm.correctAnswer" label="3">答案3</el-radio>
      <el-radio v-model="questionsForm.correctAnswer" label="4">答案4</el-radio>
    </el-form-item>
    <el-form-item label="答案解析" prop="answerAnalysis">
      <el-input type="textarea" v-model="questionsForm.answerAnalysis"></el-input>
    </el-form-item>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定提交吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('questionsForm')">立即创建</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-form-item>
      <el-button type="primary" @click="dialogVisible = true">确定</el-button>
      <el-button @click="resetForm('questionsForm')">重置</el-button>
    </el-form-item>
    <el-alert
      title="重复id"
      type="error"
      v-show="showAlert">
    </el-alert>
  </el-form>
</template>

<script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
        dialogVisible: false,
        idRepeated: true,
        showAlert: false,
        questionsForm: {
          questionId: '',
          questionLevel: '',
          questionUnit: '',
          questionTitle: '',
          option_1: '',
          option_2: '',
          option_3: '',
          option_4: '',
          correctAnswer: '',
          answerAnalysis: ''
        },
        rules: {
          questionId: [
            { type: 'number', required: true, message: '请输入题目编号', trigger: 'blur' }
          ],
          questionLevel: [
            { type: 'string', required: true, message: '请输入等级', trigger: 'blur' }
          ],
          questionUnit: [
            { type: 'string', required: true, message: '请输入单元', trigger: 'blur' }
          ],
          questionTitle: [
            { required: true, message: '请输入题目', trigger: 'blur' }
          ],
          option_1: [
            { type: 'string', required: true, message: '请输入选项', trigger: 'blur' }
          ],
          option_2: [
            { type: 'string', required: true, message: '请输入选项', trigger: 'blur' }
          ],
          option_3: [
            { type: 'string', required: true, message: '请输入选项', trigger: 'blur' }
          ],
          option_4: [
            { type: 'string', required: true, message: '请输入选项', trigger: 'blur' }
          ],
          correctAnswer: [
            { required: true, message: '请选择正确答案', trigger: 'change' }
          ],
          answerAnalysis: [
            { required: true, message: '请输入答案解析', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // number转换
            let intQuestionId = parseInt(this.questionsForm.questionId)
            let intCorrentAnswer = parseInt(this.questionsForm.correctAnswer)

            const params = {
              questionId: intQuestionId,
              questionLevel: this.questionsForm.questionLevel,
              questionUnit: this.questionsForm.questionUnit,
              questionTitle: this.questionsForm.questionTitle,
              option_1: this.questionsForm.option_1,
              option_2: this.questionsForm.option_2,
              option_3: this.questionsForm.option_3,
              option_4: this.questionsForm.option_4,
              correctAnswer: intCorrentAnswer,
              answerAnalysis: this.questionsForm.answerAnalysis
            }

            // 判断是否是重复id
            axios.get('http://localhost:3000/questions/check', {
              params: {
                questionId: this.questionsForm.questionId
              }
            }).then((response) => {
              let res = response.data
              if (res.status === '1') {
                console.log('checkerr:' + res.msg)
                this.idRepeated = false
              } else {
                // console.log('重复id：' + res.result)
                let num = parseInt(res.result.idNum)
                if (num > 0) {
                  console.log('存在相同id')
                  this.idAlert()
                  // this.resetForm(formName)
                  this.dialogVisible = false
                } else {
                  axios.post('http://localhost:3000/questions/add', params)
                  .then((response) => {
                    console.log(response)
                    this.idPass()
                  })
                  .catch((error) => {
                    console.log(error)
                  })
                  this.resetForm(formName)
                  this.dialogVisible = false
                }
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      idAlert () {
        this.$message.error('已存在相同id!')
      },
      idPass () {
        this.$message.success('添加成功!')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
