<template>
  <el-form :model="questionsForm" :rules="rules" ref="questionsForm" label-width="100px" class="demo-questionsForm">
  <el-form-item label="题目编号" prop="questionId">
    <el-input v-model="questionsForm.questionId"></el-input>
  </el-form-item>
  <el-form-item label="题目等级" prop="questionLevel">
    <el-input v-model="questionsForm.questionLevel.level" placeholder="等级"></el-input>
    <el-input v-model="questionsForm.questionLevel.unit" placeholder="单元"></el-input>
  </el-form-item>
  <el-form-item label="题目标题" prop="questionTitle">
    <el-input v-model="questionsForm.questionTitle"></el-input>
  </el-form-item>
  <el-form-item label="选项" prop="questionOptions">
    <el-input v-model="questionsForm.questionOptions.one" placeholder="选项1"></el-input>
    <el-input v-model="questionsForm.questionOptions.two" placeholder="选项2"></el-input>
    <el-input v-model="questionsForm.questionOptions.three" placeholder="选项3"></el-input>
    <el-input v-model="questionsForm.questionOptions.four" placeholder="选项4"></el-input>
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
          questionLevel: {
            level: '',
            unit: ''
          },
          questionTitle: '',
          questionOptions: {
            one: '',
            two: '',
            three: '',
            four: ''
          },
          correctAnswer: '',
          answerAnalysis: ''
        },
        rules: {
          questionId: [
            { required: true, message: '请输入题目id', trigger: 'blur' }
          ],
          questionLevel: {
            type: 'object', required: true, message: '请输入等级', trigger: 'blur',
            level: { type: 'string', required: true, message: '长度在 1 到 5 个字符', trigger: 'blur' },
            unit: { type: 'string', required: true, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          },
          questionTitle: [
            { required: true, message: '请输入题目', trigger: 'blur' }
          ],
          questionOptions: {
            type: 'object', required: true, message: '请输入选项', trigger: 'blur',
            
          },
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
              questionTitle: this.questionsForm.questionTitle,
              questionOptions: this.questionsForm.questionOptions,
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
