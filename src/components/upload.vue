<template>
  <el-form :model="questionsForm" :rules="rules" ref="questionsForm" label-width="100px" class="demo-questionsForm">
  <el-form-item label="题目编号" prop="questionId">
    <el-input v-model="questionsForm.questionId"></el-input>
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
  <el-form-item>
    <el-button type="primary" @click="submitForm('questionsForm')">立即创建</el-button>
    <el-button @click="resetForm('questionsForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
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
            { type: 'string', required: true, message: '请输入活动名称', trigger: 'blur' }
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
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const params = {
              questionId: this.questionsForm.questionId,
              questionLevel: this.questionsForm.questionLevel,
              questionUnit: this.questionsForm.questionUnit,
              questionTitle: this.questionsForm.questionTitle,
              option_1: this.questionsForm.option_1,
              option_2: this.questionsForm.option_2,
              option_3: this.questionsForm.option_3,
              option_4: this.questionsForm.option_4,
              correctAnswer: this.questionsForm.correctAnswer,
              answerAnalysis: this.questionsForm.answerAnalysis
            }
            axios.post('http://localhost:3000/questions/add', params)
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.log(error)
            })

            this.resetForm(formName)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
