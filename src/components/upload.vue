<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="题目编号" prop="questionId">
    <el-input v-model="ruleForm.questionId"></el-input>
  </el-form-item>
  <el-form-item label="题目等级" prop="questionLevel">
    <el-input v-model="ruleForm.questionLevel.level" placeholder="等级"></el-input>
    <el-input v-model="ruleForm.questionLevel.unit" placeholder="单元"></el-input>
  </el-form-item>
  <el-form-item label="题目标题" prop="questionTitle">
    <el-input v-model="ruleForm.questionTitle"></el-input>
  </el-form-item>
  <el-form-item label="题目选项" prop="questionOptions">
    <el-input v-model="ruleForm.questionOptions.one" placeholder="选项1"></el-input>
    <el-input v-model="ruleForm.questionOptions.two" placeholder="选项2"></el-input>
    <el-input v-model="ruleForm.questionOptions.three" placeholder="选项3"></el-input>
    <el-input v-model="ruleForm.questionOptions.four" placeholder="选项4"></el-input>
  </el-form-item>
  <el-form-item label="答案" prop="correctAnswer">
    <el-radio-group v-model="ruleForm.correctAnswer">
      <el-radio label="1">答案1</el-radio>
      <el-radio label="2">答案2</el-radio>
      <el-radio label="3">答案3</el-radio>
      <el-radio label="4">答案4</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="答案解析" prop="answerAnalysis">
    <el-input type="textarea" v-model="ruleForm.answerAnalysis"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
        ruleForm: {
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
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
