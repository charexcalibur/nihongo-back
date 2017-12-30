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
          <el-button @click="_deleteList(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" @click="_getid(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        centerDialogVisible: false
      }
    },
    mounted () {
      this._initData()
    },
    methods: {
      handleClick (row) {
        console.log(row.questionId)
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
      }
    }
  }
</script>