/* 1. ‘Corporate’ branch에 해당하는 모든 사원의 이름, 기존 급여, 10% 증가된 급여를 출력하라. */
select first_name, last_name, salary, salary*1.1 as increased_salary
from employee e
inner join branch b
on e.branch_id = b.branch_id
where b.branch_name = 'Corporate';


/* 2. 급여가 60,000에서 80,000 사이에 있는 모든 남자 사원의 이름, 급여를 출력하라. */
select first_name, last_name, salary
from employee
where salary between 60000 and 80000
and sex = 'M';


/* 3. 모든 사원을 1. branch_id(내림차순) 2. 급여(오름차순)으로 정렬하고, 이름, branch_id, 급여를 출력하라. */
select first_name, last_name, branch_id, salary
from employee
order by branch_id desc, salary asc;


/* 4. ‘FedEx’와 일하는 급여 60,000 이상의 모든 사원의 이름, total_sales를 출력하라. */
select e.first_name, e.last_name, ww.total_sales 
from employee e
inner join works_with ww on e.emp_id = ww.emp_id
inner join client c on c.client_id = ww.client_id
where e.salary >= 60000
and c.client_name = 'FedEx';


/* 5. 사원의 급여의 합, 최고 급여, 최저 급여, 평균 급여를 출력하라. */
select 
sum(salary) as sum_salary,
max(salary) as max_salary,
min(salary) as min_salary,
avg(salary) as avg_salary
from employee;


/* 6. 회사의 총 사원수를 제시하라. */
select count(*) as overall_employee from employee;


/* 7. 각 branch별 근무하는 사원의 수를 검색하여 branch 이름과 소속 사원수를 출력하라. */
select b.branch_name, count(*) as employee_number 
from employee e
inner join branch b 
on e.branch_id = b.branch_id
group by e.branch_id;

