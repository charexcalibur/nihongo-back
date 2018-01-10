<template>
  <div>
    <el-table
      :data = "questionsList"
      border
      style="width: 100%">
      <el-table-column
        prop="questionId"
        label="题目ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="questionLevel"
        label="等级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="questionType"
        label="类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="questionUnit"
        label="单元"
        width="120">
      </el-table-column>
      <el-table-column
        prop="questionTitle"
        label="题目标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="correctAnswer"
        label="正确答案"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">

          <el-button @click="editForm(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" @click="_getid(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改题目" :visible.sync="editFormVisible">
      <el-form :model="questionsForm" :rules="rules" ref="questionsForm">
        <el-form-item label="题目等级" prop="questionLevel">
          <el-input v-model="questionsForm.questionLevel" placeholder="等级"></el-input>
        </el-form-item>
        <el-form-item label="题目单元" prop="questionUnit">
          <el-input v-model="questionsForm.questionUnit" placeholder="单元"></el-input>
        </el-form-item>
        <el-form-item label="题目类型" prop="questionType">
          <el-select v-model="questionsForm.questionType" placeholder="请选题目类型">
            <el-option label="文法" value="文法"></el-option>
            <el-option label="文字词汇" value="文字词汇"></el-option>
          </el-select>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = true">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定提交吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('questionsForm')">修改</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>删除提示</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="_deleteList()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        questionsList: [],
        questionId: 0,
        count: 0,
        currentPage: 1,
        pageSize: 10,
        centerDialogVisible: false,
        editFormVisible: false,
        dialogVisible: false,
        selectedId: '',
        questionsForm: {
          questionId: '',
          questionLevel: '',
          questionType: '',
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
          questionType: [
            { required: true, message: '请选择题目类型', trigger: 'change'}
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
    mounted () {
      this._initData()
    },
    components: {
      // headTop
    },
    methods: {
      editForm (row) {
        this.editFormVisible = true

        this.selectedId = row.questionId
        this.questionsForm.questionLevel = row.questionLevel
        this.questionsForm.questionUnit = row.questionUnit
        this.questionsForm.questionTitle = row.questionTitle
        this.questionsForm.option_1 = row.option_1
        this.questionsForm.option_2 = row.option_2
        this.questionsForm.option_3 = row.option_3
        this.questionsForm.option_4 = row.option_4
        this.questionsForm.correctAnswer = row.correctAnswer
        this.questionsForm.answerAnalysis = row.answerAnalysis
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // number转换
            let intQuestionId = parseInt(this.selectedId)
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
            axios.post('http://localhost:3000/questions/update', params)
            .then((response) => {
              console.log(response)
              this.idPass()
            })
            .catch((error) => {
              console.log(error)
            })
            this._initData()
            this.dialogVisible = false
            this.editFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleClick (row) {
        console.log(row)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._initData()
      },
      _initData () {
        let param = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }

        axios.get('http://localhost:3000/questions/num').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.count = res.result.count
          }
        })

        axios.get('http://localhost:3000/questions/show', {
          params: param
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.questionsList = res.result.list
          } else {
            this.questionsList = []
          }
        })
      },
      _getid (row) {
        this.questionId = row.questionId
        this.centerDialogVisible = true
      },
      _deleteList () {
        const params = {
          questionId: this.questionId
        }

        axios.post('http://localhost:3000/questions/del', params)
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('del suc')
            this.centerDialogVisible = false
            this._initData()
          }
        })
      },
      resetForm (formName) {
        console.log('重置表单')
        this.$refs[formName].resetFields()
      },
      idPass () {
        this.$message.success('修改成功!')
      }
    }
  }
</script>