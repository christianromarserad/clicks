import styled from 'styled-components';

export const InlineBlock = styled.div`
    display: inline-block;
    padding: ${props => props.p};
    background-color: ${props => props.bg};
    margin: ${props => props.m};
    width: ${props => props.w};
    height: ${props => props.h};
    margin-top: ${props => props.mt};
    margin-bottom: ${props => props.mb};
    margin-right: ${props => props.mr};
    margin-left: ${props => props.ml};
    padding-top: ${props => props.pt};
    padding-right: ${props => props.pr};
    padding-bottom: ${props => props.pb};
    padding-left: ${props => props.pl};
    border-radius: ${props => props.br};
    box-shadow: ${props => props.bs};
    border: ${props => props.border};
`

export const Text = styled(InlineBlock)`
    color: ${props => props.color};
    font-family: ${props => props.ff};
    font-size: ${props => props.fs};
    font-weight: ${props => {
        if (props.bold) {
            return 'bold'
        }
        else if (props.bolder) {
            return 'bolder'
        }
        else if (props.lighter) {
            return 'lighter'
        }
    }};
`

export const Button = styled(Text)`
    cursor: pointer;
    text-align: ${(props => {
        if (props.textCenter) {
            return 'center'
        }
        else if (props.textLeft) {
            return 'left'
        }
        else if (props.textRight) {
            return 'right'
        }
    })};
`

export const SvgButton = styled(Button)`
    fill: ${props => props.fill};
`


export const Flex = styled(InlineBlock)`
    display: flex;
    flex-direction: ${props => props.vertical && 'column'}; 
    flex-grow: ${props => props.flexGrow};
    justify-content: ${props => {
        if (props.hstart) {
            return 'start'
        }
        else if (props.hcenter) {
            return 'center'
        }
        else if (props.hend) {
            return 'end'
        }
    }};
    align-items: ${props => {
        if (props.vstart) {
            return 'start'
        }
        else if (props.vcenter) {
            return 'center'
        }
        else if (props.vend) {
            return 'end'
        }
    }};
`